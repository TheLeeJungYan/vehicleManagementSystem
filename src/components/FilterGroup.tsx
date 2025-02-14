import FilterGroupProps from "@/types/FilterGroup.type";

const FilterGroup:React.FC<FilterGroupProps> = ({children,label}) => {
    return (
        <div>
            <label className="text-gray-500 text-xs ml-1 font-poppins">{label}</label>
            {children}
        </div>
    )
}
export default FilterGroup;