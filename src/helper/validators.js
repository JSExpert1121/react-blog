import validator from 'validator'

export const isRequired = txt => txt && txt.length > 0

export const isEmail = txt => validator.isEmail(txt)

export const minLength = limit => txt => txt.length >= limit

export const maxLength = limit => txt => txt.length <= limit

export const isPhoneNo = txt => {
    const phone = txt.replace(/[ -]/g, '')
    console.log(phone, validator.isMobilePhone(phone))
    return validator.isMobilePhone(phone)
}

export const match = other => txt => other === txt