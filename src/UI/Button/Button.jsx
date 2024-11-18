import classNames from 'classnames';
import './Button.scss';

function Button({ config: propsConfig = {}, additionalClasses = '', onClickAction, children }) {
    const defaultConfig = {
        visualType: 'primary',
        type: 'button',
        size: 'sm'
    };
    const config = {
        ...defaultConfig,
        ...propsConfig
    };

    return (
        <button
            className={classNames([config.size, config.visualType], "button", [additionalClasses])}
            type={config.type}
            onClick={onClickAction}
        >
            {children}
        </button>
    )
}

export default Button;
