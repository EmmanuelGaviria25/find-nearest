import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <img
            src="https://emmanuelgaviria25.github.io/find-nearest/images/logo-vinotinto.png"
            alt="Logo creator"
            style={{ width: '250px', height: 'auto', borderRadius: '28px' }}
        />
      </div>
      <div style={socialStyle}>
        <a href="https://www.linkedin.com/in/emmanuel-gaviria-00bb16124/" style={iconStyle}>
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/EmmanuelGaviria25" style={iconStyle}>
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#a5a5a5',
  color: '#ccc',
  textAlign: 'center',
  padding: '10px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const contentStyle: React.CSSProperties = {
  marginBottom: '0px',
};

const socialStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
};

const iconStyle: React.CSSProperties = {
  color: '#313131',
  textDecoration: 'none',
  fontSize: '30px',
};

export default Footer;
