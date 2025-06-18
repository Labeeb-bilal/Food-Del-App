import './Footer.css'

export default function Footer() {
    return (
      <div>
      <div className="footer-container">
      <div className="col-one">
          <h2>Tomato</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, maiores voluptatibus...
          </p>
        </div>
        <div className="col-two">
          <h2>Company</h2>
          <ul className="li-items">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="col-three">
          <h2>Contact</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptate sint  Voluptatem voluptate sint reiciendis...
          </p>
        </div>
        <hr/>


      </div>
        <div className='copy-right'>
          Copyright © {new Date().getFullYear()}
        </div>
      </div>
    );
  }
  