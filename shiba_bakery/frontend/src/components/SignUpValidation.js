
const signUpValidation = (values) => {
    
    let errors={};

    
    // Name error
    if(!values.nameUser){
        errors.nameUser="Name is required";
    }

    // Surname error
    if(!values.surnameUser){
        errors.surnameUser="Surname is required";
    }

    // Password error
    if(!values.passwordUser){
        errors.passwordUser="Password is required";
    }else if(values.passwordUser.length < 8 ){
        errors.passwordUser="Password must be at least 8 characters";
    }

    // Confirm Password error
    if(!values.confirmUser){
        errors.confirmUser="Confirm password is required";
    }else if( values.confirmUser != values.passwordUser){
        errors.confirmUser="Password don't match";
    }

    // Email error
    if(!values.emailUser){
        errors.emailUser="Email is required";
    }

    // Agreedment error
    if(!values.checked){
        errors.checked="Please agree to the terms og use";
    }
    
    return errors;

}
export default signUpValidation