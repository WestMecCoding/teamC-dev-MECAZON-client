export function sortAscending(items) {
    return [...items].sort((a, b) => a.price - b.price);
}

export default function filterByCategory(items, category) {
    if (!category || category === 'all') {
        return items;
    }
    return items.filter(item => {
        return item.category.toLowerCase() === category.toLowerCase();
    })
}