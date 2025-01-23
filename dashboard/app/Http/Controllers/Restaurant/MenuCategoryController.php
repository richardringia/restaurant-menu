<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Repositories\Interfaces\MenuCategoryRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuCategoryController extends Controller
{
    public function __construct(
        private MenuCategoryRepositoryInterface $menuCategoryRepository
    ) {}

    /**
     * Display a listing of the menu categories.
     */
    public function index(Request $request): Response
    {
        $restaurant = $request->user()->restaurants()->first();
        
        return Inertia::render('Restaurant/Categories/Index', [
            'categories' => $this->menuCategoryRepository->getByRestaurantId($restaurant->id)
        ]);
    }

    /**
     * Show the form for creating a new menu category.
     */
    public function create(): Response
    {
        return Inertia::render('Restaurant/Categories/Create');
    }

    /**
     * Store a newly created menu category in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $restaurant = $request->user()->restaurants()->first();
        $validated['restaurant_id'] = $restaurant->id;

        $this->menuCategoryRepository->create($validated);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Show the form for editing the specified menu category.
     */
    public function edit(MenuCategory $category): Response
    {
        return Inertia::render('Restaurant/Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified menu category in storage.
     */
    public function update(Request $request, MenuCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $this->menuCategoryRepository->update($category, $validated);

        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified menu category from storage.
     */
    public function destroy(MenuCategory $category): RedirectResponse
    {
        $this->menuCategoryRepository->delete($category);

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    /**
     * Reorder the categories.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'categoryIds' => ['required', 'array'],
            'categoryIds.*' => ['required', 'integer', 'exists:menu_categories,id'],
        ]);

        $this->menuCategoryRepository->reorder($validated['categoryIds']);

        return redirect()->route('categories.index')
            ->with('success', 'Categories reordered successfully.');
    }
}
