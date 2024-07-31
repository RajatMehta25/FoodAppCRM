import React, { useState } from 'react'
import {IconUser, IconEmail} from './SvgElements'
import styled from 'styled-components'

const SearchIcon = styled.span`
    width: 8%;
    padding: 5px;
    text-align: center;
    color: #000000;
    /* font-size: 20px; */
    background: #FFFFFF;
    border-radius: 8px 0px 0px 8px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Input(props) {
  const { error, type, icon, noBorderBottom } = props;
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
        <div className={`input_box ${icon ? 'borderBottom' : ''} ${noBorderBottom ? '' : 'borderBottom'}`}>
        {icon ? (
          <SearchIcon>
            <img src={icon}></img>
          </SearchIcon>
        ) : (
          ""
        )}
          <input {...props} type={type ? (showPassword ? "text" : type) : "text"}/>
          {type === "password" ? (
            <i onClick={() => setShowPassword(!showPassword)} className={`fa ${!showPassword ? "fa-eye-slash" : "fa-eye"}`}>

            </i>
          ) : (
            ""
          )}
        </div>
      {error ? (
        <p
          style={{
            paddingTop: 5,
            fontSize: 13,
            color: "red",
            textAlign: "left"
          }}>
          {error}
        </p>
      ) : null}
    </>
  );
}
