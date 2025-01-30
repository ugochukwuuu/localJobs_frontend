<script setup>
   import "@/assets/stylings/userRoles.css"
    import {supabase} from '@/config/supabase'
    import { createToastInterface, useToast } from "vue-toastification";

    import {onMounted,reactive,ref,toRaw} from 'vue';
    import load1 from "@/components/loader/load1.vue";

    import store from "@/store/store";
    const toast = useToast();
    const userId  = store.state.userId;

    const allowEdit = ref(false);
    const isGettingDetails = ref(false);
    const isUpdating = ref(false);

    const originalFile = ref(null);

    const userDetails = ref({});
    const publicUrl = ref(null);

    const allowEditFunc = ()=>{
        allowEdit.value = !allowEdit.value;
    }

    const updateFormData = reactive({
        "name":"",
        "email": "",
        "phone_no": "",
        "biography": "",
        "profile_img": ""
    })

    const validate = () => {
        if (updateFormData.name === "" || updateFormData.name == null) {
            toast.warning('First name is required');
            return false;
        }
        if (updateFormData.email === "" || updateFormData.email == null) {
            toast.warning('Email is required');
            return false;
        }
        if (!updateFormData.profile_img) {
            toast.error('Please select a valid profile image');
            return;
        }
        if (updateFormData.phone_no === "" || updateFormData.phone_no == null) {
            toast.warning('phone number is required');
            return false;
        }
        if (updateFormData.biography === "" || updateFormData.biography == null) {
            toast.warning('Put in your biography');
            return false;
        }
        return true;
    }

    const getUserDetails = async ()=>{
        isGettingDetails.value = true;
        let {data:user, error} = await supabase
        .from("users")
        .select("*")
        .eq("id",userId)

        if (error) {
        console.log("Error getting jobs", error.message);
        }
        userDetails.value = user?.[0] || null;
        console.log(toRaw(userDetails.value))
        isGettingDetails.value = false;
    }

    const checkUniqueDetails = async (newEmail, newPhone, userId)=>{

        const cleanEmail = newEmail.trim().toLowerCase();
        const cleanPhone = newPhone.replace(/[-\s]/g, '');



        const {data,error} = await supabase
        .from('users')
        .select('id,email,phone_no')
        .or(`email.eq.${cleanEmail},phone_no.eq.${cleanPhone}`) 

        .neq('id',userId)

        if(error){
            console.error(error)
        }
        return data?.length > 0
    }

    const handleFileUpload = async (event) => {
            const file = event.target.files[0];
            if (!file) return false;


            const VALID_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
            const MAX_SIZE_MB = 5;
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;


            const resetFileInput = () => {
                event.target.value = null;
                updateFormData.profile_img = null;
            };


            if (!VALID_TYPES.includes(file.type)) {
                toast.error(`Invalid file type. Allowed types: ${VALID_TYPES.join(', ')}`);
                resetFileInput();
                return false;
            }


            if (file.size > MAX_SIZE_BYTES) {
                toast.error(`File too large (max ${MAX_SIZE_MB}MB)`);
                resetFileInput();
                return false;
            }

            const fileName = `${Date.now()}_${file.name}`;
            updateFormData.profile_img = fileName;
            originalFile.value = file;
            return true;
    };


    const handleUpdateDetails = async (e)=>{
        e.preventDefault();

        if(!validate()) return;
        
        if (!updateFormData.profile_img) {
            toast.error('Please select a valid profile image');
            return;
        }


        
        await updateDetails();
    }
    
     

    const uploadImage = async (file) => {
                try {
                    console.log('uploading the file to storage');
                    const fileName = updateDetails.profile_img || `profile_${Date.now()}_${file.name}`;
                    const { data, error } = await supabase.storage
                    .from('images') 
                    .upload(fileName, file);

                    if (error) throw error;

                    console.log("getting the public url of the image")                    
                    const { data: urlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(fileName);

                    return urlData.publicUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
    };

   
    const updateDetails = async ()=>{
            
            isUpdating.value = true;

            const isDuplicate = await checkUniqueDetails(
                updateFormData.email,
                updateFormData.phone_no,
                userId
            );

            if(isDuplicate){
                alert("Email or phone number already exists")
                isUpdating.value = false;
                return
            }

            if (!originalFile.value) {
                console.error('No file selected for upload');
                isUpdating.value = false;
                return;

            }
            const uploadResponse = await uploadImage(originalFile.value);
       
            if(uploadResponse){
                updateFormData.profile_img = uploadResponse;
            }


            console.log(updateFormData)

            const { data, error } = await supabase
            .from('users')
            .update({
                name: updateFormData.name,
                email: updateFormData.email,
                phone_no: updateFormData.phone_no,
                biography: updateFormData.biography,
                profile_img: updateFormData.profile_img
            })
            .eq('id', userId)
            .select()
        
        if (error) {
            console.error('Update failed:', error);
            isUpdating.value = false;
            toast.error('Failed to update profile. Please try again.');
            return;
        }
            toast.success('Profile updated successfully');
            console.log(data)
            location.reload();
            isUpdating.value = false;
        
    }



    onMounted(async ()=>{
       await getUserDetails();
    })

</script>

<template>
    <main class="user-profile">
        <load1 v-if="isGettingDetails"/>
        <load1 v-if="isUpdating"/>
         <div v-if="!allowEdit" class="user-details-cont">
            <div class="avatar-cont d-flex align-items-left justify-content-center">
                <img 
                :src="userDetails?.profile_img || `https://ui-avatars.com/api/?name=${userDetails?.name || 'X'}&background=random`"
                alt="Profile photo"
                >
            </div>
    
            <div class="user-details">
                <h3>  {{ userDetails.name}}</h3>
                <p>{{ userDetails.email || "you haven't set up your email" }}</p>
                <p>  {{ userDetails.phone_no || "you haven't set up your phone number" }}</p>
                <p>  {{ userDetails.biography || "you haven't set up your biography" }}</p>

            </div>
    
            <div class="job-action-buttons">
                    <div @click="allowEditFunc"  class="job-action-button edit-job-btn align-items-center flex-row cursor">
                        <i class="pi pi-pencil"></i>
                        <p>Edit Profile</p>
                     </div>
            </div>    
        </div>
    
            <form v-else class="edit-form-cont" @submit="handleUpdateDetails">
                <input type="file" class="file-input edit-input" @change="handleFileUpload" required>

                <input  class="edit-input" :placeholder="userDetails.name" v-model="updateFormData.name" required>
                <input  type="email" class="edit-input" :placeholder="userDetails.email" v-model="updateFormData.email" required>
                <input  type="tel" class="edit-input" :placeholder="userDetails.phone_no || 'Write in your phone number'" v-model="updateFormData.phone_no" required>
                <textarea  class="edit-input" :placeholder="userDetails.biography || 'Write in your biography'" v-model="updateFormData.biography" required></textarea>
    
                <button type="submit" class="job-action-button save-btn" >
                <p>Save Changes</p>
                </button>
    
                <div  class="job-action-button cancel-btn" @click="allowEditFunc">
                <p>Cancel</p>
                </div>
            </form>
    </main>

</template>

