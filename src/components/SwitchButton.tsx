import styled from '@emotion/styled'

interface ButtonProps {
  primary: boolean
}

const SwitchButton = styled.div<ButtonProps>`
background-color: ${props =>
  props.primary ? '#e95b71' : '#21b3a2'
};
color: white;
font-size: 14px;
padding: 8px;
:hover {
  background-color: ${props =>
    props.primary ? '#75cec4' : '#ed7587'}
}
width: fit-content;
transition: background-color 0.2s ease-in-out;
font-style: italic;
font-weight: bold;
`

export default SwitchButton
