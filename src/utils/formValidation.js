

export const validate = (email, password, name) => {

    const emailValidation = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);

    const passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);


    if (!emailValidation) return "Email is Invalid";
    if (!passwordValidation) return "Password is Invalid";

    if (name === "") {
        const nameValidation = /^[\\p{L} .'-]+$/.test(name);
        if (!nameValidation) return "Enter a name";
    }

    return null;
}
