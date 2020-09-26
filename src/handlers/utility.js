export const elements = [
    {
        elementType: 'input',
        elementLabel: 'Name',
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
        },
        validation: {
            required: true,
            maxLength: 15
        }
    },
    {
        elementType: 'input',
        elementLabel: 'Time',
        elementConfig: {
            type: 'number',
            placeholder: 'Time In Minutes',
            name: 'time',
        },
        validation: {
            required: true,
            maxLength: 4
        }
    },
    {
        elementType: 'select',
        elementLabel: 'Immediacy',
        elementConfig: {
            options: [
                {value: 0, displayValue: 'low'},
                {value: 1, displayValue: 'regular'},
                {value: 2, displayValue: 'high'}
            ],
            name: 'immediacy'
        },
        validation: {
            required: true
        }
    },
    {
        elementType: 'textarea',
        elementLabel: 'Description',
        elementConfig: {
            type: 'text',
            placeholder: '',
            name: 'description',
        },
        validation: {
            required: false,
            maxLength: 60
        }
    }
]

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