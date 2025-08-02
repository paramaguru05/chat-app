import { FiUsers } from "react-icons/fi"

const SideBar = () => {


  return (
    <aside className='bg-base-200 w-[20%] h-full p-5'>
      <div className=' flex items-center p-3 '>
        <FiUsers/>
        <span className='ml-5'>Contacts</span>
      </div>
      <div className=' h-[92%] overflow-y-auto mt-5'>
        <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        
        </div>
        <div className="flex w-52 flex-col gap-4 mt-10">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>
        <div className="flex w-52 flex-col gap-4 mt-10">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>
        <div className="flex w-52 flex-col gap-4 mt-10">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>
        <div className="flex w-52 flex-col gap-4 mt-10">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>

      </div>
 
    </aside>
  )
}

export default SideBar