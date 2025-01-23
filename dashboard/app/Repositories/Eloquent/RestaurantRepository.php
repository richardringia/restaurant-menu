<?php

namespace App\Repositories\Eloquent;

use App\Models\Restaurant;
use App\Repositories\Interfaces\RestaurantRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class RestaurantRepository implements RestaurantRepositoryInterface
{
    public function all(): Collection
    {
        return Restaurant::all();
    }

    public function findById(int $id): ?Restaurant
    {
        return Restaurant::find($id);
    }

    public function create(array $data): Restaurant
    {
        return Restaurant::create($data);
    }

    public function update(Restaurant $restaurant, array $data): bool
    {
        return $restaurant->update($data);
    }

    public function delete(Restaurant $restaurant): bool
    {
        return $restaurant->delete();
    }
} 