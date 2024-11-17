import classNames from 'classnames';
import './Modal.scss';

function Modal({ config: propsConfig = {}, additionalClasses = '', isOpen, toggleModal, children }) {
    const defaultConfig = {
        title: 'Modal',
        size: 'md'
    };
    const config = {
        ...defaultConfig,
        ...propsConfig
    };
    
    return (
        <div
            className={classNames(
                { ['!opacity-100 !pointer-events-auto']: isOpen },
                'modal fixed top-0 left-0 bg-overley z-30 w-screen h-screen transition-opacity duration-500 opacity-0 pointer-events-none',
                [additionalClasses]
            )}
            onClick={toggleModal}
        >
            <div
                className={classNames(
                    [config.size],
                    'modal__wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 p-5 bg-background rounded-lg w-11/12 transition-transform duration-500',
                    { ['!scale-100']: isOpen }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between gap-10">
                    <h4>
                        { config.title }
                    </h4>
                    <h5
                        className="cursor-pointer ml-4"
                        onClick={toggleModal}
                    >
                        X
                    </h5>
                </div>
                <div className="mt-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
