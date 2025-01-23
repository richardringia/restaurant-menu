<?php

namespace App\Repositories\Eloquent;

use App\Models\MenuCategory;
use App\Repositories\Interfaces\MenuCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class MenuCategoryRepository implements MenuCategoryRepositoryInterface
{
    public function all(): Collection
    {
        return MenuCategory::orderBy('sort')->get();
    }

    public function findById(int $id): ?MenuCategory
    {
        return MenuCategory::find($id);
    }

    public function getByRestaurantId(int $restaurantId): Collection
    {
        return MenuCategory::where('restaurant_id', $restaurantId)
            ->orderBy('sort')
            ->get();
    }

    public function create(array $data): MenuCategory
    {
        if (!isset($data['sort'])) {
            $maxSort = MenuCategory::where('restaurant_id', $data['restaurant_id'])
                ->max('sort') ?? 0;
            $data['sort'] = $maxSort + 1;
        }
        
        return MenuCategory::create($data);
    }

    public function update(MenuCategory $category, array $data): bool
    {
        return $category->update($data);
    }

    public function delete(MenuCategory $category): bool
    {
        return $category->delete();
    }

    public function reorder(array $categoryIds): bool
    {
        try {
            DB::beginTransaction();
            
            foreach ($categoryIds as $index => $id) {
                MenuCategory::where('id', $id)->update(['sort' => $index + 1]);
            }
            
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
} 