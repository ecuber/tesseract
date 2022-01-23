import styled from '@emotion/styled'

const ControlPanel = styled.div`
position: absolute;
margin: 1em;
background-color: lightgray;
padding: 1.3em;
display: flex;
gap: 0.8em;
flex-direction: column;
@media (min-width: 670px){
      flex-direction: row;
      gap: 1em;
   }
`

export default ControlPanel
