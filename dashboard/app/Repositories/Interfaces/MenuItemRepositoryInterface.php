<?php

namespace App\Repositories\Interfaces;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Collection;

interface MenuItemRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?MenuItem;
    public function getByCategoryId(int $categoryId): Collection;
    public function create(array $data): MenuItem;
    public function update(MenuItem $item, array $data): bool;
    public function delete(MenuItem $item): bool;
} 