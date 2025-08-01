import { useEffect, useState } from 'react';
import { products } from '../data';
import type { Product } from '../types';

type Filter = {
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
    category: string;
};

const defaultFilter: Filter = {
    searchQuery: '',
    minPrice: 0,
    maxPrice: Infinity,
    category: '',
};

const ProductFilter = () => {
    // TODO: Implement the filtering logic based on filter object
    // Edge cases to consider:
    // - Empty filters
    // - Partial match of name (case-insensitive)
    // - maxPrice = Infinity
    // - minPrice > maxPrice should return empty
    // - empty category matches all
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const [localSearch, setLocalSearch] = useState(filter.searchQuery);

    const getFilteredProducts = (): Product[] => {
        if (
            filter.minPrice !== null &&
            filter.maxPrice !== null &&
            filter.minPrice > filter.maxPrice
        ) {
            return [];
        }

        return products.filter((product) => {
            const matchesName =
                filter.searchQuery.length === 0 ||
                product.name
                    .toLowerCase()
                    .includes(filter.searchQuery.toLowerCase());

            const matchesMinPrice =
                filter.minPrice === null || product.price >= filter.minPrice;

            const matchesMaxPrice =
                filter.maxPrice === null || product.price <= filter.maxPrice;

            const matchesCategory =
                filter.category.length === 0 ||
                product.category === filter.category;

            return (
                matchesName &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesCategory
            );
        });
    };

    const filteredProducts = getFilteredProducts();

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     setFilter((prev) => ({
    //         ...prev,
    //         searchQuery: localSearch.trim()
    //     }));
    // }, 300); // Debounce delay in milliseconds
    
    //   return () => {
    //     clearTimeout(timeout)
    //   }
    // }, [localSearch, setFilter])
    

    return (
        <div className="flex flex-col m-2">
            <h2 className="font-bold">Product Search</h2>
            <div className="flex flex-row p-2 gap-2 bg-gray-50 text-black border-r-2 mt-2">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={filter.searchQuery}
                    onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
                />

                <input
                    type="number"
                    value={filter.minPrice}
                    placeholder="Min Price"
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            minPrice: (e.target.value) ? Number(e.target.value) : 0,
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={filter.maxPrice}
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            maxPrice: Number(e.target.value) || Infinity,
                        })
                    }
                />

                <select
                    value={filter.category}
                    onChange={(e) =>
                        setFilter({ ...filter, category: e.target.value })
                    }
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Home Appliances">Home Appliances</option>
                </select>
            </div>
            <ul
                data-testid="product-list"
                className="flex flex-col mt-4 bg-gray-100 p-4 text-black"
            >
                {filteredProducts.map((product) => (
                    <li key={product.id} data-testid="product-item">
                        {product.name} (${product.price}) - {product.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductFilter;
