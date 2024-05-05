import './PsiText.css';

const PsiText = (props) => {
    return (
        <div className="psi-text">
            {props.children}
        </div>
    );
}

export default PsiText;