import {Container} from './textareaitemcss.js'
import {FiPlus, FiX} from 'react-icons/fi'
const TextareaItem = ({isNew, value, onClick, ...rest}) => {
    return (
        <Container $isNew={isNew} >
            <input  type="text" value={value} readOnly={!isNew} {...rest} />
            <button type='button'   onClick={onClick}>{isNew ? <FiPlus /> : <FiX />}</button>
        </Container>
    )
}

export default TextareaItem;
