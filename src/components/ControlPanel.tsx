import styled from '@emotion/styled'

const ControlPanel = styled.div`
position: absolute;
margin: 1em;
background-color: lightgray;
padding: 1.3em;
display: flex;
gap: 0.8em;
flex-direction: column;
width: calc(100% - 2 * (1.3em + 1em));
@media (min-width: 670px){
      flex-direction: row;
      gap: 1em;
      width: 600px;
   }
`

export default ControlPanel
