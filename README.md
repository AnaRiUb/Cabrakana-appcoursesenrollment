<p align="center">
    <img src="https://res.cloudinary.com/dyg2tq33j/image/upload/v1733893930/PIWSICON_xm4rot.jpg" alt="Piwis Logo" width="32" height="32"> Piwis
</p>

<h2 align="center">Frontend Repository</h2>

> Developed by [Ana Rivas](https://github.com/AnaRiUb).

<div align="center">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
    <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
</div>

<p align="center">
    <a href="sv-okqeu9h5xb.cloud.elastika.pe:3000">
        <img src="https://res.cloudinary.com/dyg2tq33j/image/upload/v1733893930/PIWSICON_xm4rot.jpg" width="32" height="32" alt="Website Link"> Website Link
    </a> 
    <a href="https://github.com/AnaRiUb/Cabrakana-appcoursesenrollment">
    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repository Link" width="32" height="32">
    </a>
</p>

<h2>Tabla de Contenidos</h2>
<ul>
    <li><a href="#descripción-del-proyecto">Descripción del Proyecto</a></li>
    <li><a href="#características-principales">Características Principales</a></li>
    <li><a href="#funcionamiento-de-la-página">Funcionamiento de la Página</a></li>
    <li><a href="#backend">Backend</a></li>
</ul>

<h2 id="descripción-del-proyecto">Descripción del Proyecto</h2>
<p>Piwis es una plataforma diseñada para facilitar la inscripción a cursos, ofrecer foros para dudas y comentarios educativos. Ademas permite a los usuarios crear y seguir eventos educativos.</p>

<h2 id="características-principales">Características Principales</h2>
<ul>
    <li>Inscripción de Cursos</li>
    <li>Foros Interactivos</li>
    <li>Eventos Educativos</li>
    <li>Interfaz Intuitiva y Responsiva</li>
    <li>Sistema de Autenticación</li>
</ul>

<h2 id="funcionamiento-de-la-página">Funcionamiento de la Página</h2>
<h3>Home</h3>
<p>Acceso rápido a las secciones principales: <strong>Cursos</strong>, <strong>Foros</strong> y <strong>Eventos</strong>.</p>

<h3>Inscripción de Cursos</h3>
<ul>
    <li>Explora una lista de cursos organizados por categorías.</li>
    <li>Inscríbete con un solo clic y gestiona tu progreso.</li>
</ul>

<h3>Foros Educativos</h3>
<ul>
    <li>Publica dudas y comentarios sobre temas específicos.</li>
    <li>Interactúa con otros usuarios para compartir ideas y resolver problemas.</li>
</ul>

<h3>Eventos Educativos</h3>
<ul>
    <li>Crea tus propios eventos educativos y promuévelos entre otros usuarios.</li>
    <li>Sigue eventos creados por otros para mantenerte al tanto de las actividades educativas.</li>
</ul>

<h2 id="backend">Backend</h2>

<h3>Tecnologías Utilizadas</h3>
<div align="center">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
    <img src="https://img.shields.io/badge/Cloudinary-F2F3F4?style=for-the-badge&logo=cloudinary&logoColor=blue">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</div>


<h3>Endpoints Principales</h3>
<table border="1">
    <tr>
        <th>Método</th>
        <th>Endpoint</th>
        <th>Descripción</th>
        <th>Acceso</th>
    </tr>
    <tr>
        <td>POST</td>
        <td>/auth/register</td>
        <td>Registro de usuarios</td>
        <td>Público</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/auth/login</td>
        <td>Inicio de sesión y generación de JWT</td>
        <td>Público</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/users/:id</td>
        <td>Obtener información de usuario</td>
        <td>Privado</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/courses</td>
        <td>Crear un nuevo curso</td>
        <td>Privado</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/forums</td>
        <td>Crear una nueva publicación en el foro</td>
        <td>Privado</td>
    </tr>
</table>

</body>
</html>
