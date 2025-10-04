import './Curso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHeartbeat, faSquareRootVariable, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const Curso = () => {
    const materias = [
        {
            nome: "Algorithms I-III",
            descricao: "Starting in Pascal, advancing to C, teaching logic and the most important and used data structures.",
            icon: faCode
        },
        {
            nome: "Human and Systemic Anatomy",
            descricao: "Study of the structure and functioning of the human body.",
            icon: faHeartbeat
        },
        {
            nome: "Introduction to Computer Science",
            descricao: "Presentation of scientific computing and its applications, focusing on real problems.",
            icon: faCode
        },
        {
            nome: "Digital Circuits & Computer Architecture",
            descricao: "Learning the lowest level of computing, digital logic and processors.",
            icon: faMicrochip
        },
        {
            nome: "Pre-Calculus & Calculus I",
            descricao: "Basic and advanced mathematics, including functions, limits, derivatives and integrals.",
            icon: faSquareRootVariable
        },
        {
            nome: "Complements of Mathematics",
            descricao: "Mathematical logic, set theory, and how to do proofs.",
            icon: faSquareRootVariable
        },
        {
            nome: "Introduction to Analytic Geometry and Linear Algebra",
            descricao: "Study of vectors, matrices, linear systems and their applications.",
            icon: faSquareRootVariable
        },
        {
            nome: "Organization of the Brazilian Health System",
            descricao: "Teach how Brazil's healthcare system works, including public policies and management.",
            icon: faHeartbeat
        },
        {
            nome: "Cellular Biochemistry",
            descricao: "Understand the smallest units of life, cells, and how they work.",
            icon: faHeartbeat
        },
        {
            nome: "Programming I-II",
            descricao: "Basic to advanced programming in C, including data structures and algorithms.",
            icon: faCode
        },
        {
            nome: "Fundamentals of Cell and Tissue Biology",
            descricao: "Understand the structure and function of cells and tissues in the human body.",
            icon: faHeartbeat
        }
    ];

    return (
        <section className="curso-container">
            <div className="curso-content">
                <div className="curso-header">
                    <h2 className="curso-title">Biomedical Informatics</h2>
                    <p className="curso-description">
                        Integration of information technology and health sciences to
                        develop innovative solutions in diagnosis, treatment, and hospital management.
                        Multidisciplinary training combining computing, medicine, and scientific research.
                    </p>
            
                </div>

                <div className="materias-section">
                    <h3 className="materias-title">Completed Subjects</h3>
                    <div className="materias-grid">
                        {materias.map((materia, index) => (
                            <div key={index} className="materia-card">
                                <div className="materia-header">
                                    <div className="materia-icon">
                                        <FontAwesomeIcon icon={materia.icon} />
                                    </div>
                                    <h4 className="materia-name">{materia.nome}</h4>
                                </div>
                                <p className="materia-descricao">{materia.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Curso;