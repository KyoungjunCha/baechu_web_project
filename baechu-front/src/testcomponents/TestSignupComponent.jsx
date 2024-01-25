import React from 'react'
import PropTypes from 'prop-types'

function TestSignupComponent({ user_id, userNickName, email, password,province, city, birthday }) {
  return (
    <div>
        <p>유저 id : {user_id}</p>
        <p>닉네임 : {userNickName}</p>
        <p>이메일 : {email}</p>
        <p>비밀번호 : {password}</p>
        <p>도 : {province}</p>
        <p>시 : {city}</p>
        <p>생일 : {birthday}</p>
    </div>
  )
}


TestSignupComponent.propTypes = {
    user_id: PropTypes.number.isRequired,
    userNickName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password : PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    birthday: PropTypes.number.isRequired
}

export default TestSignupComponent