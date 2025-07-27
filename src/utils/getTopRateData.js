export const getTopRatedData = (data, topN = 5, order = "desc") => {
    if (!data) return [];
console.log("data--+++",data)
    let mappedData;
    if (data?.states && data?.values) {
        mappedData = data.states.map((state, index) => ({
            title:state,
            value: parseFloat(data.values[index]) || data.values[index]
        }));
    } else if(data?.center_names) {
        mappedData = data.center_names.map((center, index) => ({
            title:center,
            value: parseFloat(data.values[index])
        }));
    }else if(data?.rrb_names){
        mappedData = data.rrb_names.map((center, index) => ({
            title:center,
            value: parseFloat(data.values[index])
        }));
    }else if(data?.states && data?.total_reviews){
        mappedData = data.states.map((state, index) => ({
            title:state,
            value: parseFloat(data.total_reviews[index])
        }));
    }


    mappedData.sort((a, b) => (order === "asc" ? a.value - b.value : b.value - a.value));

    const sortedData = mappedData.slice(0, topN);

    return [{
        title: sortedData.map(item => item.title),
        total_reviews: sortedData.map(item => item.value.toString())
    }];
};
