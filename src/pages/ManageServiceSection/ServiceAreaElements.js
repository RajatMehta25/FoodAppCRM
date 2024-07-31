
import styled from 'styled-components/macro'




export const MultipleButtons = styled.div`
    padding: 0.5rem 2rem;
    padding-top: 0px;
    margin-top: 1rem;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    width: 100%;


    @media screen and (max-width: 768px) {
        padding: 0.5rem 1.5rem;
        margin-top: 0.4rem;
        width: 100%;
    }
    
    @media screen and (max-width: 480px) {
        margin-top: 0.2rem;
        padding: 0.5rem 1rem;
    }

    @media screen and (max-width: 320px) {
        margin-top: 0rem;
        padding: 0.5rem 1rem;
    }
`

export const TripleButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;

`


export const MultipleButton = styled.button`
        box-shadow: 0px 0px 10px #00000030;
        border: 1px solid #EB7D35;
        border-radius: 2px;
        opacity: 1;
        /* margin: 0.4em; */
        white-space: nowrap;
        /* border: none; */
        font-weight: ${({ dropDown }) => (dropDown ? '600' : '600')};
        padding: ${({ dropDown }) => (dropDown ? '0.7em 1.6em' : '0.5em')};
        background: ${({ selected }) => (selected ? '#EB7D35' : '#FFF9FB')};
        color: ${({ selected }) => (selected ? '#FFF9FB' : '#EB7D35')};
        font-size: ${({ dropDown }) => (dropDown ? '1rem' : '1rem')};
        outline: none;
        cursor: pointer;
        display: flex;
        justify-content: ${({ primary }) => (primary ? 'center' : 'center')};
        align-items: center;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        margin-bottom: 1rem;
        width: 100%;


    
        /* &:hover {
            transition: all 0.2s ease-in-out;
            background: ${({ primary }) => (primary ? '#FF4001' : 'transparent')};
            border: 1px solid ${({ primary }) => (primary ? "#FF4001" : "#FFFFFF")};
            color: ${(dark) => (dark ? '#F1F1F1' : '#F1F1F1')};
        } */
    
    
        @media screen and (max-width: 768px) {
            /* margin: 0.5em; */
            margin-left: 0;
            padding: ${({ big }) => (big ? '0.5em 2em' : '0.3em')};
            font-size: ${({ fontBig }) => (fontBig ? '1.2em' : '0.9em')};
        }
    
        @media screen and (max-width: 480px) {
            /* margin: 0.5em; */
            margin-left : 0;
            margin-bottom: 0rem;
            padding: ${({ big }) => (big ? '0.5em 2em' : '0.3em')};
            font-size: ${({ fontBig }) => (fontBig ? '1.2em' : '0.7em')};
            margin-bottom: 0.5rem;
        }
        @media screen and (max-width: 320px) {
            /* margin: 0.5em; */
            margin-left : 0;
            margin-bottom: 0rem;
            padding: ${({ big }) => (big ? '0.5em 2em' : '0.2em')};
            font-size: ${({ fontBig }) => (fontBig ? '1.2em' : '0.6em')};
            margin-bottom: 0.3rem;
        }
    
    `



// table 

export const ServiceTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
`


export const ServiceTableRow = styled.tr`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
`


export const ServiceTableHeading = styled.th`
   text-align: left;
  font: 600 15px/20px Montserrat;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;
  padding: 1rem;
`



export const ServiceTableRowHeader = styled.tr`
      border-collapse: collapse;
      border-spacing: 0px;
      width: 100%;
      border-right: solid 1px grey; 
      border-left: solid 1px grey;
      border: 1px solid #eb7d35;
      background:  #eb7d35
`;



export const ServiceTableColumn = styled.td`
      padding: 1rem;
      text-align: left;
      font: bold 15px/20px Montserrat;
      letter-spacing: 0px;
      color: #363636;
      opacity: 1;
      border-right: solid 1px grey; 
      border-left: solid 1px grey;
`

export const ServiceTableWrapper = styled.div`
    height: auto;
    width: 100%;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 12rem;
    /* display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2rem; */

`


export const TotalTableRow = styled.tr`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
`


export const TotalTableColumn = styled.td`
      padding: 1rem;
      text-align: center;
      font: bold 15px/20px Montserrat;
      letter-spacing: 0px;
      color: #363636;
      opacity: 1;
`


export const AddAmountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`






