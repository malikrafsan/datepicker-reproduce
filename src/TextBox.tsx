import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import Clear from '../../images/icon/system/rico_24_clear.svg'

const getMoneyFormat = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace(/\s/g, '')
  }

  const propTypes = {
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    userHasPressed: PropTypes.bool,
    textBoxInput: PropTypes.bool,
    keyText: PropTypes.string,
    email: PropTypes.bool,
    money: PropTypes.bool,
    phone: PropTypes.bool,
    readonly: PropTypes.bool,
    landphone: PropTypes.bool,
    deleteAction: PropTypes.func,
  }

const TextBox = (props) => {
  const [visibility, setVisibility] = useState('hidden')
  const [IsFocused, setIsFocused] = useState(false)
  const {
    labelText = 'Text Box',
    eventleanplum = 'Leanplum Label',
    placeholder = 'Placeholder',
    required = true,
    email = false,
    money = false,
    phone = false,
    readonly = false,
    landphone = false,
    ktp = false,
    type = 'text',
    keyText = '',
    disabled = false,
    value = '',
    isValid = true,
    deleteButton = true,
    deleteAction = () => {},
    onInput = () => {},
    onClick = () => {},
    errorLabel = '',
    autoFocus = false,
    isOverLimit = false,
    max,
  } = props

  const handleOnFocus = (e) => {
    const { name } = e.target

    setVisibility('visible')
    setIsFocused('true')
  }

  const handleOnBlur = (e) => {
    const { name } = e.target

    setTimeout(() => {
      setVisibility('hidden')
      setIsFocused(false)
    }, 200)
  }

  const handleDeleteAction = (e) => {
    deleteAction(e)
    setVisibility('hidden')
  }

  const commonAttributes = {
    onValueChange: onInput,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    value: value || '',
    isNumericString: true,
    name: keyText,
  }

  return (
    <div className="ravier-text-box" key={`textBox-${keyText}`}>
      <label className="ravier-text-box__label">{labelText}</label>
      {!phone && !money && !ktp && !landphone && (
        <input
          className="ravier-text-box__input"
          placeholder={placeholder}
          type={type}
          name={keyText}
          value={value || ''}
          disabled={disabled}
          readOnly={readonly}
          onInput={onInput}
          onChange={onInput}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onClick={onClick}
          autoFocus={autoFocus}
        />
      )}
      {ktp && (
        <NumberFormat
          format={'##-##-##-##-##-##-####'}
          className="ravier-text-box__input ktp"
          disabled={disabled}
          {...commonAttributes}
        />
      )}
      {phone && (
        <div className="unit-wrapper">
          <div className="unit">+62</div>
          <NumberFormat className="ravier-text-box__input phone" disabled={disabled} {...commonAttributes} />
        </div>
      )}
      {landphone && (
        <NumberFormat format={'(###) ############'} className="ravier-text-box__input" {...commonAttributes} />
      )}
      {money && (
        <div className="unit-wrapper">
          <div className="unit">Rp</div>
          <NumberFormat
            thousandSeparator={'.'}
            decimalSeparator={','}
            allowLeadingZeros={false}
            decimalScale={0}
            allowEmptyFormatting={true}
            className="ravier-text-box__input money"
            {...commonAttributes}
          />
        </div>
      )}
      {deleteButton && (
        <img
          alt="clear"
          src={Clear}
          className={`delete-text ${visibility}`}
          value={keyText}
          onClick={handleDeleteAction}
          onFocus={handleOnFocus}
          onBlur={handleOnFocus}
        />
      )}
      {IsFocused && !value && !email && required && (
        <p className="error-text">
          <span className="error-key">{errorLabel || labelText}</span> tidak boleh kosong.
        </p>
      )}
      {IsFocused && value && !isValid && (
        <p className="error-text">
          <span className="error-key">{errorLabel || labelText}</span> tidak valid.
        </p>
      )}
      {IsFocused && value && isOverLimit && max && (
        <p className="error-text unset-lower-case">{`Isi dengan maks. ${money ? getMoneyFormat(max) : max}.`}</p>
      )}
    </div>
  )
}



TextBox.propTypes = propTypes

export default TextBox
