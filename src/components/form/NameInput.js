import React from 'react'


const NameInput = props => {
    const { prefix, name1, setName1, name2, setName2, error, ...rest } = props;

    const cls1 = (error[0]) ? 'form-control border border-danger' : 'form-control'
    const cls2 = (error[1]) ? 'form-control border border-danger' : 'form-control'
    return (
        <div className='form-group row'>
            <div className='col'>
                <label htmlFor={`${prefix}-name1`}>First Name</label>
                <input
                    type='text'
                    className={cls1}
                    placeholder='First Name'
                    aria-describedby={`${prefix}-name1-help`}
                    id={`${prefix}-name1`}
                    value={name1}
                    onChange={e => setName1(e.target.value)}
                    {...rest}
                />
                <small
                    id={`${prefix}-name1-help`}
                    className='form-text text-danger'
                    style={{ visibility: error[0] ? 'visible' : 'hidden' }}
                >
                    {error[0]}
                </small>
            </div>
            <div className='col'>
                <label htmlFor={`${prefix}-name2`}>Last Name</label>
                <input
                    type='text'
                    className={cls2}
                    placeholder='Last Name'
                    aria-describedby={`${prefix}-name2-help`}
                    id={`${prefix}-name2`}
                    value={name2}
                    onChange={e => setName2(e.target.value)}
                    {...rest}
                />
                <small
                    id={`${prefix}-name2-help`}
                    className='form-text text-danger'
                    style={{ visibility: error[1] ? 'visible' : 'hidden' }}
                >
                    {error[1]}
                </small>
            </div>
        </div>
    )
}

NameInput.propTypes = {

}

export default NameInput
