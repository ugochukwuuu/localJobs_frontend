<template>
    <div class="recruiter-profile">
        <div class="profile-header">
            <img :src="profileImg" alt="Profile Image" class="profile-img" />
            <h1>{{ name }}</h1>
            <p>{{ email }}</p>
        </div>
        <div class="profile-details">
            <p><strong>Company:</strong> {{ company }}</p>
            <p><strong>Position:</strong> {{ position }}</p>
            <p><strong>Location:</strong> {{ location }}</p>
            <p><strong>About:</strong> {{ about }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profileImg: 'path/to/profile-image.jpg',
            name: 'John Doe',
            email: 'john.doe@example.com',
            company: 'Tech Solutions Inc.',
            position: 'Senior Recruiter',
            location: 'New York, NY',
            about: 'Experienced recruiter with a passion for finding the best talent.'
        };
    }
};
</script>

<style scoped>
.recruiter-profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.profile-header {
    text-align: center;
}

.profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}

.profile-details {
    margin-top: 20px;
}

.profile-details p {
    margin: 10px 0;
}
</style>