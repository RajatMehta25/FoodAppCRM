import styled from 'styled-components/macro'


export const AgentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


export const PropertyContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 2rem;
`


export const PropertyViewLeft = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`

export const PropertyViewRight = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
`

export const PropertyImage = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
`

export const PropertyImageView = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    /* box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px; */
    margin-bottom: 1rem;
    padding: 2rem;
`



export const MultipleButtons = styled.div`
    padding: 0.5rem 2rem;
    padding-top: 0px;
    margin-top: 1rem;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-between;
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
    width: 100%;

`


export const MultipleButton = styled.button`
        box-shadow: 0px 0px 10px #00000030;
        border: 1px solid #D90066;
        border-radius: 2px;
        opacity: 1;
        /* margin: 0.4em; */
        white-space: nowrap;
        /* border: none; */
        font-weight: ${({ dropDown }) => (dropDown ? '600' : '500')};
        padding: ${({ dropDown }) => (dropDown ? '0.7em 1.6em' : '0.3em')};
        background: ${({ selected }) => (selected ? '#D90066' : '#FFF9FB')};
        color: ${({ selected }) => (selected ? '#FFF9FB' : '#D90066')};
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

export const AgentInformation = styled.div`
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: flex-start; */
`

export const AgentInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
`

export const AgentInputLabel = styled.div`
   display: flex;
    justify-content: flex-start;
    align-items: center;
   font-weight: 600;
   font-size: 1rem;
   letter-spacing: 0px;
    opacity: 1;
    color: #f53d0e;
    margin-right: 4rem;
    white-space: nowrap;
`

export const AgentInputText = styled.div`
   font-weight: 500;
   font-size: 1rem;
   letter-spacing: 0px;
   white-space: nowrap;
`

export const PropertyButton = styled.div`
    background-color: ${({ isSeleted }) => (isSeleted === "1" ? 'green' :
    isSeleted === "2" ? 'blue' : 
    isSeleted === "3" ? 'red' : 
    isSeleted === "4" ? 'yellow' : 
    isSeleted === "5" ? 'orange' :
    isSeleted === "6" ? 'red' :
     'red')};
    color: ${({ isSeleted }) => (isSeleted === "1" ? 'white' :
    isSeleted === "2" ? 'white' : 
    isSeleted === "3" ? 'white' : 
    isSeleted === "4" ? 'black' : 
    isSeleted === "5" ? 'white' :
    isSeleted === "6" ? 'white' :
     'white')};
    padding: 0.5rem 0.5rem;
    border-radius: 5px;
    text-align: center;
    cursor : pointer;
    outline: none;
`



