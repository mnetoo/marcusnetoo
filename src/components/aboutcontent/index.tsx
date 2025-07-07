import './style.css';

const Apresentação = () => {

  return (

    // Este 'div' será o nosso container flexível que centraliza o conteúdo
    <div className="about-container">
      {/* Este 'div' interno segura os parágrafos e define a largura máxima do texto */}
      <div className="about-text-content">
        <p>
          Hi! My name is Marcus Neto and I am a developer with a passion for
          creating innovative and efficient solutions. With experience in modern
          technologies, I constantly seek to learn and improve my skills.
        </p>
        <p>
          Since childhood, I have dreamed of working in healthcare as a physician. However, 
          as I grew older and explored more of the world, I discovered the fascinating field of 
          technology and software development, which sparked a new passion. When I found the 
          Biomedical Informatics program, I realized I could combine the best of both worlds: 
          cutting-edge technology and human health. This field allows me to work at the intersection 
          of healthcare, science, and technological innovation.
        </p>
        <p>
          I am currently an undergraduate student in Biomedical Informatics at the Federal University of Paraná (UFPR), 
          located at the Centro Politécnico campus. Since the beginning of my studies, I have been deeply engaged in both 
          theoretical and practical learning through active participation in academic, scientific, and extracurricular projects, including:
          
          <ul>
            <li>- <b>SBIB (Brazilian Week of Biomedical Informatics)</b> – contributed to the organization and logistics of the national event;</li>  
            <li>- <b>CEIB (Biomedical Informatics Student Council)</b> – involved in student representation and academic integration initiatives;</li>
            <li>- <b>CEPAG (Center for Applied Research in Geoinformation)</b> – research internship focused on image processing and geospatial data analysis.</li>
          </ul>        

          <ul>
            <b>Scientific Research Projects:</b>
            <li>Development of an internal system for Instituto Lamir, focused on data management and user-friendly interfaces;</li>
            <li>Research in Optical Character Recognition (OCR) with emphasis on image pre-processing and feature extraction techniques.</li>
          </ul>
        </p>

        <p>
          I also had the opportunity to work as an IT intern at Hospital Erasto Gaertner, where I supported the development of solutions for 
          optimizing radiotherapy scheduling and automating routine tests in clinical equipment. This experience provided direct exposure to 
          hospital information systems, clinical protocols, and the challenge of building robust solutions in a high-stakes medical environment.
        </p>

        <p>
          <ul>
            <b>Technical Skills:</b>
            <li><b>Software Development:</b> Proficient in Python, C/C++/C#, web development technologies; experienced with Git version control; 
              background in both desktop and web application development;
            </li>
            <li>
              <b>Algorithms and Data Structures:</b> Strong foundation in algorithmic logic, time complexity analysis, sorting/search algorithms, 
              graphs, trees, and abstract data types (levels 1 through 3);
            </li>
            <li>
              <b>Biomedical Sciences:</b> Academic knowledge in human anatomy, cell biology, and molecular biology.
            </li>
          </ul>
        </p>

        <p>
          My goal is to work on projects that combine technology, healthcare, and social impact. I believe in the power of applied computing to transform medicine 
          and to deliver innovative solutions that save lives and improve the quality of healthcare services.
        </p>
      </div>
    </div>

  );

};

export default Apresentação;