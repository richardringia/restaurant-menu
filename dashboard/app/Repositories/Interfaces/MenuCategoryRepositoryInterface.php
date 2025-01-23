<?php

namespace App\Repositories\Interfaces;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Collection;

interface MenuCategoryRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?MenuCategory;
    public function getByRestaurantId(int $restaurantId): Collection;
    public function create(array $data): MenuCategory;
    public function update(MenuCategory $category, array $data): bool;
    public function delete(MenuCategory $category): bool;
    public function reorder(array $categoryIds): bool;
} 