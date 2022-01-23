import styled from '@emotion/styled'

interface PropTypes {
  flex?: number
}

const CenVert = styled.div<PropTypes>`
  display: flex;
  flex: ${props => props.flex ?? ''};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default CenVert
