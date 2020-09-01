
export const handleValidation = (validation, value) => {

    let isValid = true;

    Object.keys(validation).forEach(key => {

        switch (key) {
            case ('required'):
                isValid = isValid && value !== '';
                break;
            case ('maxLength'):
                isValid = isValid && value.length <= validation[key];
                break;
        }
    });

    return isValid;
}