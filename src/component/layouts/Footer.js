import styles from './Footer.module.css';
import {Link} from 'react-router-dom';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

function Footer(props) {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><a href='https://www.facebook.com/lenito.arruda' target="_blank" rel='noreferrer'><FaFacebook /></a></li>
                <li><a href='https://www.instagram.com/lenitoarruda/' target="_blank" rel='noreferrer'><FaInstagram  /></a></li>
                <li><a href='https://www.linkedin.com/in/lenito-arruda/' target="_blank" rel='noreferrer'><FaLinkedin /></a></li>    
            </ul>
            <p className={styles.copy_right}><span>Wise Project</span> &copy; 2023</p>
        </footer>
    );
}

export default Footer;