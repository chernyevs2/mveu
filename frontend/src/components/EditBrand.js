import { Modal, Button, Form } from 'react-bootstrap'
import { createBrand, fetchBrand, updateBrand } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'

const EditBrand = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchBrand(id)
                .then(
                    data => {
                        setName(data.name)
                        setValid(data.name !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim()
            }
            const success = (data) => {
                
                setShow(false)
                
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            id ? updateBrand(id, data).then(success).catch(error) : createBrand(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} бренда</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Название бренда..."
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditBrand