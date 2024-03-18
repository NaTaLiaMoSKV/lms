import React, { useState } from 'react';
import { ModalFormButtonsWrapper, SectionFormContainer } from "../CoursesPage/CoursesPage.styled";
import studentsData from '../../../data/students.json';
import { StudentFormButton, StudentFormItem, StudentFormList } from './GroupsPage.styled';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { ActionFormButton, FormInput } from 'styles/Form.styled';


export default function StudentsForm({ students, onClose, setFieldValue }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState(students);
    
    const filterStudentsByName = () => {
        return studentsData.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleToggleStudent = (studentId) => {
        const isSelected = selectedStudents.some(student => student.id === studentId);
        
        if (isSelected) {
            setSelectedStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
        } else {
            const selectedStudent = studentsData.find(student => student.id === studentId);
            if (selectedStudent) {
                setSelectedStudents(prevStudents => [...prevStudents, selectedStudent]);
            }
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setFieldValue('students', selectedStudents);
        onClose();
    }

    return (
        <SectionFormContainer style={{ width: '100%' }}>
            <FormInput 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <StudentFormList>
                {searchTerm.length >= 2 && filterStudentsByName().map(student => (
                    <StudentFormItem key={student.id} attr={selectedStudents.some(selectedStudent => selectedStudent.id === student.id) ? 'selected' : ''} >
                        <p>{student.name}</p>
                        <StudentFormButton onClick={(e) => { e.preventDefault(); handleToggleStudent(student.id) }}>
                            {selectedStudents.some(selectedStudent => selectedStudent.id === student.id) ?
                                <FaMinus style={{ width: '17px', height: '17px' }} /> :
                                <FaPlus style={{ width: '17px', height: '17px' }} />
                            }
                        </StudentFormButton>
                    </StudentFormItem>
                ))}
            </StudentFormList>
            <ModalFormButtonsWrapper>
                <ActionFormButton attr="save" type="button" onClick={handleSave}>Save</ActionFormButton>
                <ActionFormButton type="button" onClick={onClose}>Cancel</ActionFormButton>
            </ModalFormButtonsWrapper>
        </SectionFormContainer>
    )
}
