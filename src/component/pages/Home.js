import styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layouts/LinkButton';

function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Welcome to <span>Wise Project</span></h1>
            <p>Start managing your projects right now!</p>
            <LinkButton to="/newproject" text="Create Project" />
            <img src={savings} alt='Wise Project' />
        </section>
    );
}

export default Home;