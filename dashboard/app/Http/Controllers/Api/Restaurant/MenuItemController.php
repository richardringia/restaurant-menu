<?php

namespace App\Http\Controllers\Api\Restaurant;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\MenuItemRepositoryInterface;
use Illuminate\Http\JsonResponse;

class MenuItemController extends Controller
{
    public function __construct(
        private MenuItemRepositoryInterface $menuItemRepository
    ) {}

    /**
     * Get all menu items.
     */
    public function index(): JsonResponse
    {
        $items = $this->menuItemRepository->all();
        
        return response()->json([
            'data' => $items
        ]);
    }
} 