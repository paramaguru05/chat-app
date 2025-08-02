import { useDispatch,useSelector } from 'react-redux';
import {setTheame} from "../slice/theame.slice"

const SettingsPage = () => {


  const theame = useSelector((state)=> state.theame.theame)
  const dispatch = useDispatch()
  const daisyThemes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro",
  "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel",
  "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business",
  "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",
  "caramellatte", "abyss", "silk"
];



  return (
    <div className=' w-full sm:w-[95%]  h-[calc(100vh-5.5rem)] mx-auto mt-2 pl-[10%]'>
      <div  className=' w-[50%] p-3 '>
        <h1 className='text-2xl font-bold'>Theams</h1>
        <p className=' mt-4'>Choose your theam for chat interface</p>
      </div>
      <div className=' w-[95%] sm:w-[80%] h-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-2 p-3 overflow-y-auto'>
        {
          daisyThemes.map( t =>{
            return (
                      <div  key={t} className='w-36  '>
                          <div onClick={()=> dispatch(setTheame(t)) }  data-theme={t}  className={`w-36 flex justify-evenly p-2 items-center h-12 rounded-[7px] bg-base-300 cursor-pointer mt-1 ${ t===theame ? 'ring-2 ring-primary' :'' } `}>
                            <div className='w-7 h-7 rounded-[10px] bg-primary'> </div>
                            <div className='w-7 h-7 rounded-[10px] bg-secondary'> </div>
                            <div className='w-7 h-7 rounded-[10px] bg-accent'> </div>
                            <div className='w-7 h-7 rounded-[10px] bg-neutral'> </div>
                          </div>
                          <p className='text-center mt-2'>{t}</p>
                      </div>
            )
          })
        }        
      </div>
      
    </div>
  )
}

export default SettingsPage