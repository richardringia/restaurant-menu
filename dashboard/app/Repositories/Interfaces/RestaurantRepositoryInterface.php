<?php

namespace App\Repositories\Interfaces;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Collection;

interface RestaurantRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?Restaurant;
    public function create(array $data): Restaurant;
    public function update(Restaurant $restaurant, array $data): bool;
    public function delete(Restaurant $restaurant): bool;
} 