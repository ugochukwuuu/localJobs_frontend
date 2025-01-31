import{r as d,u as E,a as V,c as U,b as e,d as N,e as $,n as p,j as n,t as z,w as m,v as y,f as D,g as h,h as S,i as T,s as b,k as j,o as _,R as q,l as B}from"./index-Bf35r3vJ.js";/* empty css             */const I={class:"signupPage"},Z={class:"left-div"},F={class:"ld-wrapper"},L={class:"role-selection-div"},Y={class:"role-selection-options option"},J={class:"role-description"},M={class:"full-name-field"},H={class:"ef-input"},G={class:"password-div original-div d-flex align-items-center"},K=["type"],O={class:"password-div d-flex align-items-center"},Q=["type"],W={class:"login"},oe={__name:"Register",setup(X){const u=d(!1),r=E(),s=V({name:"",email:"",password:"",role:""}),f=d(""),g=d(""),k=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&._]{6,}$/,x=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;let l=d("");const R=()=>s.name===""||s.name==null?(r.warning("First name is required"),!1):s.email===""||s.email==null?(r.warning("Email is required"),!1):s.password===""||s.password==null?(r.warning("Password is required"),!1):s.role==""||s.role==null?(r.warning("Please select your role"),!1):x.test(s.email)?k.test(s.password)?f.value.value!==g.value.value?(r.warning("Passwords do not match"),!1):!0:(r.warning("Your Password should have atleast one uppercase letter, one lowercase letter, one number and one special character"),!1):(r.warning("Email is invalid"),!1),A=async a=>{a.preventDefault(),R()&&(console.log(s),P())},P=async()=>{var v;console.log("registering..."),u.value=!0;const{data:a,error:o}=await b.auth.signUp({email:s.email,password:s.password});if(o){r.error("Registration error:",o.message),console.error("Registration error:",o.message);return}else{const c=(v=a.session)==null?void 0:v.access_token;console.log("Auth token:",c||"No token available (email confirmation required)"),c&&localStorage.setItem("authToken",c),localStorage.setItem("userRole",s.role),localStorage.setItem("userId",a.user.id),u.value=!1}const{error:t}=await b.from("users").insert([{id:a.user.id,email:a.user.email,password:s.password,name:s.name,role:s.role}]);t?(r.error("Error saving user to custom table:",t.message),console.error("Error saving user to custom table:",t.message)):(console.log("User data saved to custom table."),r.success("You have successfully registered"),j.replace(`/${s.role}/jobs/${a.user.id}`).then(()=>{location.reload()}))},i=d(!1),C=()=>{console.log("working"),i.value=!i.value},w=a=>{s.role=a.target.id,l.value=a.target.id,console.log(l)};return(a,o)=>(_(),U("body",null,[e("main",I,[e("div",Z,[u.value?(_(),N(B,{key:0})):$("",!0),e("div",F,[o[7]||(o[7]=e("h2",null,"Create Your Account✨",-1)),e("form",{class:"email-form",onSubmit:A},[e("div",L,[o[3]||(o[3]=e("div",{class:"line-text"},[e("span"),e("p",null,"How do you want to use localJobs?"),e("span")],-1)),e("div",Y,[e("button",{class:p(["role",n(l)&&n(l)==="freelancer"?"selected":"normal"]),type:"button",id:"freelancer",onClick:w},"Freelancer",2),e("button",{class:p(["role",n(l)&&n(l)!=="freelancer"?"selected":"normal"]),type:"button",id:"recruiter",onClick:w},"Recruiter",2)]),e("p",J,z(n(l)?n(l)==="freelancer"?`As a freelancer, you’ll browse and 
                            apply for local jobs that match your 
                            skills and interests`:`As a recruiter, you’ll post 
                            job opportunities and connect with talented 
                            freelancers nearby.`:""),1)]),e("div",M,[m(e("input",{"onUpdate:modelValue":o[0]||(o[0]=t=>s.name=t),type:"text",class:"user-name",id:"firstName",placeholder:"John"},null,512),[[y,s.name]])]),e("div",H,[m(e("input",{"onUpdate:modelValue":o[1]||(o[1]=t=>s.email=t),type:"email",placeholder:"Email"},null,512),[[y,s.email]]),e("div",G,[m(e("input",{"onUpdate:modelValue":o[2]||(o[2]=t=>s.password=t),type:i.value?"text":"password",placeholder:"Password",ref_key:"password",ref:f},null,8,K),[[D,s.password]]),e("i",{class:p(["eye-toggle",i.value?"pi pi-eye":"pi pi-eye-slash"]),onClick:C},null,2)]),e("div",O,[e("input",{type:i.value?"text":"password",placeholder:"Repeat Password",ref_key:"confirmPassword",ref:g},null,8,Q)])]),o[4]||(o[4]=e("button",{type:"submit",class:"create",id:"create-button"},"Create",-1))],32),e("p",W,[o[6]||(o[6]=h("Already have an Account? ")),S(n(q),{to:"/auth/login"},{default:T(()=>o[5]||(o[5]=[h("Login")])),_:1})])])]),o[8]||(o[8]=e("div",{class:"right-div"},null,-1))])]))}};export{oe as default};
