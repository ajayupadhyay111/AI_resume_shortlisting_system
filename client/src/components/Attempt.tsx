import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useLocation } from "react-router-dom";
import { getCandidatesByAttemptId } from "@/API/resumeAPI";
import { rejectCandidate, shortlistCandidate } from "@/API/userAPI";
import toast from "react-hot-toast";

const Attempt = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [input, setInput] = useState("")
    const [sortOrder, setSortOrder] = useState("asc");
    const location = useLocation()
    const id = location.pathname.split("/").pop();

    const fetchData = async () => {
        const response = await getCandidatesByAttemptId(id!)
        setData(response)
        setFilteredData(response)
    }
    useEffect(()=>{
        fetchData()
    },[setData])
    const sortByScore = () => {
        const sortedData = [...data].sort((a, b) =>
            sortOrder === "asc"
                ? a.aiMatchScore - b.aiMatchScore
                : b.aiMatchScore - a.aiMatchScore
        );
        setData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const FilterDataBasedOnInput = () => {
        setFilteredData(data.filter((item) => Object.values(item).some(value => value?.toString().toLowerCase().includes(input))))
    }

    const handleSelectChange = (value: string) => {
        console.log(value)
        setFilteredData(data.filter((item) => {
            if (value === "all") {
                return item
            } else {
                return item.status.toLowerCase() == value.toLowerCase()
            }
        }));
    }

    const handleRejectCandidate = async (id:string,attemptId:string) => {
        try {
            const response = await rejectCandidate(id,attemptId)
            toast.success(response.message)
            fetchData()
        } catch (error) {
            console.log("error ",error)
        }
        
    }
    const handleSubmitCandidate = async(id:string,attemptId:string)=>{
        try {
            const response = await shortlistCandidate(id,attemptId)
            toast.success(response.message)
            fetchData()
        } catch (error) {
            console.log("Error ",error)
        }
    }

    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <h2 className="text-2xl font-bold mb-12">Candidate List</h2>
                <div className="flex justify-end gap-3 mb-3 md:flex-row flex-col">
                    <div className={`border rounded-md flex justify-between items-center group ${input?.length > 0 ? "border-yellow-600" : "border-gray-500"}`}>
                        <input type="text" placeholder="Search" className="outline-none border-none pl-3 w-[80%] py-1 rounded-md" value={input} onChange={(e) => setInput(e.target.value)} />
                        <Search className={` ${input?.length > 0 ? "text-white bg-yellow-600 " : "text-gray-500"} w-[20%] h-full px-3 py-1 transition rounded-r-md`} onClick={FilterDataBasedOnInput} />
                    </div>
                    <div className="relative w-56 flex justify-center items-center">
                        <label className="text-lg font-semibold text-gray-200">Status:&nbsp;&nbsp;</label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="">
                <table className="w-full border-collapse border border-gray-700 text-left text-sm text-gray-300">
                    <thead className="bg-gray-800 text-gray-200">
                        <tr>
                            <th className="border border-gray-700 p-2">Name</th>
                            <th className="border border-gray-700 p-2">Experience</th>
                            <th className="border border-gray-700 p-2 cursor-pointer flex items-center justify-between gap-1" onClick={sortByScore}>
                                Score
                                {sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                            </th>
                            <th className="border border-gray-700 p-2">Location</th>
                            <th className="border border-gray-700 p-2">Status</th>
                            <th className="border border-gray-700 p-2">Resumes</th>
                            <th className="border border-gray-700 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((candidate) => (
                            <tr key={candidate._id} className="hover:bg-gray-800">
                                <td className="border border-gray-700 p-2">{candidate.name}</td>
                                <td className="border border-gray-700 p-2">{candidate.experience}</td>
                                <td className="border border-gray-700 p-2">{candidate.score}</td>
                                <td className="border border-gray-700 p-2">{candidate.location}</td>
                                <td className={`border border-gray-700 p-2 ${candidate.status === "Shortlisted" ? "text-green-500" : "text-red-500"}`}>{candidate.status}</td>
                                <td className="border border-gray-700 p-2 text-center">
                                    <a href={candidate.resumeURL} target="_blank" rel="noopener noreferrer">
                                        <button className="text-blue-500 underline px-2 rounded-md">
                                            View
                                        </button>
                                    </a>
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    {
                                        candidate.status === "Shortlisted" ? (
                                            <button onClick={()=>handleRejectCandidate(candidate._id,id!)} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                                                Reject
                                            </button>
                                        ) : (
                                            <button onClick={()=>handleSubmitCandidate(candidate._id,id!)} className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                                Shortlist
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attempt;
