import styled from '@emotion/styled'

interface PropTypes {
  primary: string
}

const Checkbox = styled.input<PropTypes>`
  :checked {
    accent-color: ${props => props.primary} !important;
  }
  :hover {
    cursor: pointer;
  }
`

export default Checkbox
