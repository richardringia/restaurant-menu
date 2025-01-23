<?php

namespace App\Repositories\Eloquent;

use App\Models\MenuItem;
use App\Repositories\Interfaces\MenuItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class MenuItemRepository implements MenuItemRepositoryInterface
{
    public function all(): Collection
    {
        return MenuItem::all();
    }

    public function findById(int $id): ?MenuItem
    {
        return MenuItem::find($id);
    }

    public function getByCategoryId(int $categoryId): Collection
    {
        return MenuItem::where('menu_category_id', $categoryId)->get();
    }

    public function create(array $data): MenuItem
    {
        return MenuItem::create($data);
    }

    public function update(MenuItem $item, array $data): bool
    {
        return $item->update($data);
    }

    public function delete(MenuItem $item): bool
    {
        return $item->delete();
    }
} 