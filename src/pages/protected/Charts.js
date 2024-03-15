import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Charts from '../../features/charts'
import { setPageTitle } from '../../features/common/headerSlice'
import University from '../../features/university'
import Class from '../../features/class'
import Department from '../../features/department'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [])


    return(
        <div>
            <University />
            <Class />
            <Department />
        </div>
    )
}

export default InternalPage