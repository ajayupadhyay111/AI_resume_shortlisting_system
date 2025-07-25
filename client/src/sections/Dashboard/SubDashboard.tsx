import { getAttempts } from '@/API/resumeAPI'
import Attempt from '@/components/Attempt'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Props = {}

function SubDashboard({ }: Props) {
  // array of objects
  const [attempts, setAttempts] = useState<any[]>([])
  const { id } = useParams()

  useEffect(() => {
    const fetchAttempts = async () => {
      const attempts = await getAttempts();
      console.log("attempts: ", attempts);
      setAttempts(attempts);
    }
    fetchAttempts();
  }, [])
  return (
    id ? <Attempt /> : <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Attemps</h1>
        <div className="flex flex-wrap gap-4">
          {
            attempts.map((attempt) => (
              <Link to={`/dashboard/attempt/${attempt?._id}`} key={attempt?._id}>
                <div className="w-[284px] md:w-[335px] border border-gray-700 rounded-md p-4">
                  <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-lg'><span>Role: </span>{attempt.role}</h1>
                    <p className='text-sm'>Total Resumes: <span className='font-bold'>{attempt.TotalResumes}</span></p>
                    <p className='text-sm'><span className='text-green-500'>Shortlisted: </span> <span className='font-bold'>{attempt.shortlistResumes}</span></p>
                    <p className='text-sm'><span className='text-red-500'>Rejected: </span> <span className='font-bold'>{attempt.rejectedResumes}</span></p>
                  </div>
                  <div className='flex gap-2 mt-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>View</button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
                      </DialogTrigger>
                      <DialogContent className='bg-gray-900'>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this attempt?

                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription></DialogDescription>
                        <DialogFooter>
                          <DialogClose asChild>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SubDashboard