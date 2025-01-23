<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Repositories\Interfaces\MenuCategoryRepositoryInterface;
use App\Repositories\Interfaces\MenuItemRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class MenuItemController extends Controller
{
    public function __construct(
        private MenuItemRepositoryInterface $menuItemRepository,
        private MenuCategoryRepositoryInterface $menuCategoryRepository
    ) {}

    /**
     * Display a listing of the menu items.
     */
    public function index(Request $request): Response
    {
        $restaurant = $request->user()->restaurants()->first();
        
        return Inertia::render('Restaurant/Items/Index', [
            'items' => $this->menuItemRepository->all(),
            'categories' => $this->menuCategoryRepository->getByRestaurantId($restaurant->id)
        ]);
    }

    /**
     * Show the form for creating a new menu item.
     */
    public function create(Request $request): Response
    {
        $restaurant = $request->user()->restaurants()->first();
        
        return Inertia::render('Restaurant/Items/Create', [
            'categories' => $this->menuCategoryRepository->getByRestaurantId($restaurant->id)
        ]);
    }

    /**
     * Store a newly created menu item in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        dd($request->all());
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0'],
            'menu_category_id' => ['required', 'integer', 'exists:menu_categories,id'],
        ]);

        $item = $this->menuItemRepository->create($validated);

        $item->addMedia($request->image)
            ->usingName(Str::random(10))
            ->toMediaCollection("preview")
            ->singleFile();

        return redirect()->route('items.index')
            ->with('success', 'Menu item created successfully.');
    }

    /**
     * Show the form for editing the specified menu item.
     */
    public function edit(Request $request, MenuItem $item): Response
    {
        $restaurant = $request->user()->restaurants()->first();
        
        return Inertia::render('Restaurant/Items/Edit', [
            'item' => $item,
            'categories' => $this->menuCategoryRepository->getByRestaurantId($restaurant->id)
        ]);
    }

    /**
     * Update the specified menu item in storage.
     */
    public function update(Request $request, MenuItem $item): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0'],
            'menu_category_id' => ['required', 'integer', 'exists:menu_categories,id'],
        ]);

        $this->menuItemRepository->update($item, $validated);

        if ($request->hasFile('image')) {
            $item->clearMediaCollection('preview');
            $item->addMedia($request->file('image'))
                ->usingName(Str::random(10))
                ->toMediaCollection('preview')
                ->singleFile();
        }

        return redirect()->route('items.index')
            ->with('success', 'Menu item updated successfully.');
    }

    /**
     * Remove the specified menu item from storage.
     */
    public function destroy(MenuItem $item): RedirectResponse
    {
        $this->menuItemRepository->delete($item);

        return redirect()->route('items.index')
            ->with('success', 'Menu item deleted successfully.');
    }
}