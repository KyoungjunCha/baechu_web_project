import React from 'react'
import PropTypes from 'prop-types'

function TestComponent({ user_id, userNickName, email, province, city, birthday }) {
    return (
        <div>
            <table>
                <tr>
                    <td>{user_id}</td>
                    <td>{userNickName}</td>
                    <td>{email}</td>
                    <td>{province}</td>
                    <td>{city}</td>
                    <td>{birthday}</td>
                </tr>
            </table>
        </div>
    )
}

TestComponent.propTypes = {
    user_id: PropTypes.number.isRequired,
    userNickName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    birthday: PropTypes.number.isRequired
}

export default TestComponent