import logo from '../assets/img/Logo.png'

export const LogoSinLetras = ({text}) => {
  return (
    <div className='logo-container'>
        <img className='logo' src={logo} alt='LogoS'/>
        <span className='title'>&nbsp;&nbsp;{text}</span>
    </div>
  )
}
