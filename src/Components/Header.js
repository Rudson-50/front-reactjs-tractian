import React from 'react'
import styles from './Header.module.css'
import tractian from '../Assets/tractian.png'
import { Link } from 'react-router-dom'
export const Header = () => {
    return (
        <header className={styles.header}>
    <nav className={`${styles.nav} container`}>
                <Link className={styles.logo} to="/home" >
                   <img src={tractian} alt="Tractian" />
                </Link>
                <div className={styles.links}>
            <Link className="link" to="/assets">Ativos</Link>
            <Link className="link" to="/users"> Lista de Usuário</Link>
            <Link className="link" to="/units">Lista de Unidades</Link>
            <Link className="link" to="/companies">Lista de Companias</Link>
        </div>
            </nav>
        </header>
    )
}
