import React from 'react'

import styles from './styles.module.scss'

import useInputHandler from '~/hooks/useInputHandler'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'


const validateForm = (inputs) => {
    const [, ...toCheck] = Object.values(inputs)

    return toCheck.every((value) => !!value)
}

const AddFriend = ({ onCancel = (f) => f, onSave = (f) => f }) => {

    const [inputs, setInputs] = useInputHandler({
        sex: 'male',
        firstName: '',
        lastName: '',
        totalFriends: 0,
    })

    const isFormValid = validateForm(inputs)

    return (
        <div className={styles.addFriend}>
            <div className={styles.formWrapper}>
                <Input label="First Name" type="text" name="firstName" value={inputs.firstName} onChange={setInputs} modifier="darkLabel" />
                <Input label="Last Name" type="text" name="lastName" value={inputs.lastName} onChange={setInputs} modifier="darkLabel" />
                <Input label="Total FB Friends" type="number" name="totalFriends" value={inputs.totalFriends} onChange={setInputs} modifier="darkLabel" />
                <Input label="Sex" type="select" name="sex" options={['male', 'female']} value={inputs.sex} onChange={setInputs} modifier="darkLabel" />
            </div>
            <div className={styles.btnArea}>
                <Button
                    label="Cancel"
                    onClick={onCancel}
                    modifier="secondary"
                />
                <Button
                    label="Confirm"
                    onClick={() => onSave(inputs)}
                    disabled={isFormValid ? undefined : true}
                />
            </div>
        </div>
    )
}

export default AddFriend